from rest_framework import serializers
from kanban_backend.cards.models import Card


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['id', 'row', 'seq_num', 'text']

    def create(self, validated_data):
        seq_num = 1
        card = Card.objects.create(
            text=validated_data['text'],
            row=validated_data['row'],
            seq_num=seq_num
        )
        return card
