from django.test import TestCase

# Create your tests here.

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory

from kanban_backend.cards.models import Card
from kanban_backend.users.models import User
from kanban_backend.cards.views import CardViewSet
from rest_framework.test import APITestCase
from django.urls import reverse

class CardsTestCase(APITestCase):
    def setUp(self):
        user = User.objects.create(email="lion@lion.com", username="roar", password="roar123123")
        Card.objects.create(text='1', row_id=0, owner=user, seq_num='0')

    def test_user_can_create_card(self):
        user = User.objects.get(email="lion@lion.com")
        self.client.force_authenticate(user=user)
        data = {'text': 'new idea', 'row': '0'}
        response = self.client.post('/cards/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Card.objects.count(), 2)
        self.assertEqual(Card.objects.get(text="new idea").row_id, 0)
    #
    def test_user_can_get_cards(self):
        user = User.objects.get(email="lion@lion.com")
        self.client.force_authenticate(user=user)
        response = self.client.get('/cards/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_user_can_update_card(self):
        user = User.objects.get(email="lion@lion.com")
        self.client.force_authenticate(user=user)
        id = Card.objects.get(text="1").id
        response = self.client.patch(f'/cards/{id}/', {'text': 'new idea'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(Card.objects.filter(text="new idea")), 1)

    def test_user_can_delete_card(self):
        user = User.objects.get(email="lion@lion.com")
        self.client.force_authenticate(user=user)
        id = Card.objects.get(text="1").id
        response = self.client.delete(f'/cards/{id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Card.objects.count(), 0)

    def test_another_user_can_not_see_others_cards(self):
        user = User.objects.create(email="lion1@lion.com", username="roar1", password="roar123123")
        self.client.force_authenticate(user=user)
        response = self.client.get('/cards/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_another_user_can_not_edit_others_cards(self):
        user = User.objects.create(email="lion1@lion.com", username="roar1", password="roar123123")
        self.client.force_authenticate(user=user)
        id = Card.objects.get(text="1").id
        response = self.client.patch(f'/cards/{id}/', {'text': 'new idea'})
        self.assertNotEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotEqual(len(Card.objects.filter(text="new idea")), 1)

    def test_another_user_can_not_delete_others_cards(self):
        user = User.objects.create(email="lion1@lion.com", username="roar1", password="roar123123")
        self.client.force_authenticate(user=user)
        id = Card.objects.get(text="1").id
        response = self.client.delete(f'/cards/{id}/')
        self.assertNotEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotEqual(Card.objects.count(), 0)






    # def user_can_update_cards(self):
    #     factory = APIRequestFactory()
    #     request = factory.post('/cards/', {'text': 'new idea', 'row': '0'}, format='json')
    #     request.user = user
