from django.urls import path
from . import views

urlpatterns = [
    path('webhook/', views.webhook),
    path('conversations/', views.get_all_conversations),
    path('conversations/<str:id>/', views.get_conversation),
]
