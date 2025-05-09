from .models import Message

def serialize_conversation(conversation):
    messages = Message.objects.filter(conversation=conversation)

    message_list = [
        {
            'id': message.id,
            'direction': message.direction,
            'content': message.content,
            'timestamp': message.timestamp,
        }
        for message in messages
    ]

    return {
        'id': str(conversation.id),
        'state': conversation.state,
        'created_at': conversation.created_at,
        'updated_at': conversation.updated_at,
        'messages': message_list
    }
