export const fetchIdentityCount = async (amount = 1): Promise<{ data: number }> => {
  const response = await fetch('/api/identity-count', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount }),
  })
  const result = await response.json()

  if (response.status != 200) {
    throw new Error('Failed to fetch data')
  }
  return result
}
