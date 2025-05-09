import json
import uuid
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.utils.dateparse import parse_datetime
from django.core.exceptions import ObjectDoesNotExist
from .services import is_valid_payload, handle_new_conversation, handle_new_message, handle_close_conversation
from .models import Conversation
from .serializer import serialize_conversation

@csrf_exempt
@require_http_methods(["POST"])
def webhook(request):
    try:
        payload = json.loads(request.body)
        event_type = payload.get('type')
        data = payload.get('data')
        timestamp = parse_datetime(payload.get('timestamp'))

        if not is_valid_payload(event_type, data, timestamp):
            return JsonResponse({'error': 'Invalid payload structure'}, status=400)

        if event_type == 'NEW_CONVERSATION':
            return handle_new_conversation(data)
        
        elif event_type == 'NEW_MESSAGE':
            return handle_new_message(data, timestamp)
        
        elif event_type == 'CLOSE_CONVERSATION':
            return handle_close_conversation(data)
        
        else:
            return JsonResponse({'error': 'Unknown event type'}, status=400)

    except Exception as error:
        return JsonResponse({'error': str(error)}, status=400)


@require_http_methods(["GET"])
def get_all_conversations(request):
    try:
        conversations = Conversation.objects.all()
        data = [serialize_conversation(conv) for conv in conversations]
        return JsonResponse(data, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@require_http_methods(["GET"])
def get_conversation(request, id):
    notFoundErrorReturn = {"error": "Conversation not found"}

    try:
        conversation_id = uuid.UUID(id)
    except ValueError:
        return JsonResponse(notFoundErrorReturn, status=400)

    try:
        conversation = Conversation.objects.get(id=conversation_id)
        return JsonResponse(serialize_conversation(conversation))
    except ObjectDoesNotExist:
        return JsonResponse(notFoundErrorReturn, status=404)
