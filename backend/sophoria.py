from openai import OpenAI

client = OpenAI( base_url="https://api.scaleway.ai/v1", api_key="74c6a5c8-d0a3-4a38-9c0a-1a1e6478689a")

completion = client.chat.completions.create(
    model="llama-3.1-8b-instruct",
    messages=[{"role": "user", "content": "Describe a futuristic city with advanced technology and green energy solutions."}],
    temperature=0.7,
    max_tokens=100
)

print(completion.choices[0].message.content)