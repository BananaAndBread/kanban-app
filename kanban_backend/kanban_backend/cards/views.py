from django.shortcuts import render
from django.shortcuts import render
from rest_framework import viewsets, mixins, status, permissions
from kanban_backend.cards.models import Card
from kanban_backend.cards.serializers import CardSerializer
from rest_framework.response import Response
from kanban_backend.cards.permissions import IsOwner


def increment_cards_seq_id(row):
    cards = Card.objects.filter(row=row)
    for card in cards:
        card.seq_num = card.seq_num + 1
        card.save()


class CardViewSet(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.DestroyModelMixin,
                  viewsets.GenericViewSet,
                  mixins.ListModelMixin,
                  mixins.UpdateModelMixin):
    # queryset = Card.objects.all()
    serializer_class = CardSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        return Card.objects.filter(owner=user)

    def destroy(self, *args, **kwargs):
        serializer = self.get_serializer(self.get_object())
        super().destroy(*args, **kwargs)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, **kwargs):
        serializer = self.get_serializer(data={
            **request.data,
            'seq_num': 0,
        })
        serializer.is_valid(raise_exception=True)
        increment_cards_seq_id(serializer.validated_data['row'])
        serializer.save()
        return Response(serializer.data)


# Create your views here.
