# myapp/services.py

import uuid
from django.http import JsonResponse
from .models import Conversation, Message

def is_valid_payload(event_type, data, timestamp):
    return all([event_type, data, timestamp])

def handle_new_conversation(data):
    try:
        conversation_id = uuid.UUID(data['id'])
    except (KeyError, ValueError):
        return JsonResponse({'error': 'Invalid or missing conversation ID'}, status=400)
    
    conversation, created = Conversation.objects.get_or_create(id=conversation_id, defaults={'state': 'OPEN'})
    
    if not created:
        return JsonResponse({'error': f'Conversation already {"exists" if conversation.state == "OPEN" else "closed"}.'}, status=409)

    
    return JsonResponse({'status': 'Conversation created.'}, status=201)

def handle_new_message(data, timestamp):    
    try:
        mesage_id = uuid.UUID(data['id'])
    except (KeyError, ValueError):
        return JsonResponse({'error': 'Invalid or missing mesage ID'}, status=400)
    
    try:
        conversation_id = uuid.UUID(data['id'])
    except (KeyError, ValueError):
        return JsonResponse({'error': 'Invalid or missing conversation ID'}, status=400)
    
    direction = data['direction']
    content = data['content']

    conversation = Conversation.objects.filter(id=conversation_id).first()
    
    if not conversation:
        return JsonResponse({'error': 'Conversation not found'}, status=404)

    if conversation.state == 'CLOSED':
        return JsonResponse({'error': 'Cannot add message to closed conversation'}, status=403)

    message, created = Message.objects.get_or_create(
        id=mesage_id,
        defaults={
            'conversation': conversation,
            'direction': direction,
            'content': content,
            'timestamp': timestamp
        }
    )
    
    if not created:
        return JsonResponse({'error': 'Message alredy stored.'}, status=409)
    
    return JsonResponse({'status': 'Message stored'})

def handle_close_conversation(data):
    try:
        conversation_id = uuid.UUID(data['id'])
    except (KeyError, ValueError):
        return JsonResponse({'error': 'Invalid or missing conversation ID'}, status=400)
    
    conversation = Conversation.objects.filter(id=conversation_id).first()
    if not conversation:
        return JsonResponse({'error': 'Conversation not found'}, status=404)
    
    if conversation.state == 'CLOSED':
        return JsonResponse({'status': 'Conversation already closed'}, status=200)
    
    conversation.state = 'CLOSED'
    conversation.save()
    return JsonResponse({'status': 'Conversation closed'}, status=200)
