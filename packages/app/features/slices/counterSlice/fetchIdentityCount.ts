export const fetchIdentityCount = async (amount = 1): Promise<{ data: number }> => {
  const result = { data: amount }

  // simulate IO latency
  await new Promise((r) => setTimeout(r, 1000))
  return result
}
