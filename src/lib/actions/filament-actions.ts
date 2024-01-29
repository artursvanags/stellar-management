'use client';
import { Filaments } from '@/types/database';

export async function addFilaments(data: Filaments[]) {
  try {
    await fetch(`/api/filament/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

export async function deleteFilament(id: string) {
  try {
    await fetch(`/api/filaments/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

export async function deleteFilaments(data: Filaments[]) {
  try {
    await fetch(`/api/filaments/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data.map((item) => item.id)),
    });
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

export async function updateFilament(id: string, data: Partial<Filaments>) {
  try {
    await fetch(`/api/filaments/${id}`, {
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

export async function updateFilaments(data: Partial<Filaments>[]) {
  try {
    await fetch(`/api/filaments/`, {
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
