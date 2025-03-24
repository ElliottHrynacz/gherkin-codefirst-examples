import { test, expect } from '@playwright/test';

const BASE_URL = 'https://api.example.com/v1';

test('Retrieve a list of fruits', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/fruits`);
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBeTruthy();
    expect(responseBody).toEqual(
        expect.arrayContaining([{ name: 'Apple' }, { name: 'Banana' }])
    );
});

test('Add a new fruit', async ({ request }) => {
    const newFruit = { name: 'Mango', id: 101 };
    
    const response = await request.post(`${BASE_URL}/fruits`, { data: newFruit });
    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        message: 'Fruit added successfully',
        fruit: newFruit
    });
});
