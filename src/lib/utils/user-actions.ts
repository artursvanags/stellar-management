'use client';

import { Billing, User } from '@prisma/client';

export async function updateUser(id: string, data: Partial<User>) {
  try {
    await fetch(`/api/account/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

export async function deleteUser(id: string) {
  try {
    await fetch(`/api/account/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

export async function addBilling(id: string, data: Partial<Billing>) {
  try {
    await fetch(`/api/account/${id}/billing`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

export async function updateBilling(id: string, data: Partial<Billing>) {
  try {
    await fetch(`/api/account/${id}/billing`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

export async function deleteBilling(id: string) {
  try {
    await fetch(`/api/account/${id}/billing`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}
