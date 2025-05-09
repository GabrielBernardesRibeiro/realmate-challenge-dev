import uuid
from django.db import models

class Conversation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    state = models.CharField(max_length=10, choices=[('OPEN', 'OPEN'), ('CLOSED', 'CLOSED')], default='OPEN')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Message(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    conversation = models.ForeignKey(Conversation, related_name='messages', on_delete=models.CASCADE)
    content = models.TextField()
    direction = models.CharField(max_length=10, choices=[('SENT', 'SENT'), ('RECEIVED', 'RECEIVED')])
    timestamp = models.DateTimeField(auto_now_add=True)