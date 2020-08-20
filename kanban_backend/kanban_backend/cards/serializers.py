from rest_framework import serializers
from kanban_backend.cards.models import Card
from kanban_backend.cards.models import Column

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['id', 'row', 'seq_num', 'text', 'owner']
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())
    row = serializers.PrimaryKeyRelatedField(queryset=Column.objects.all())
    # def create(self, validated_data):
    #     seq_num = 1
    #     card = Card.objects.create(
    #         text=validated_data['text'],
    #         row=validated_data['row'],
    #         seq_num=seq_num
    #     )
    #     return card
