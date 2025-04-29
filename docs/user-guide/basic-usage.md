# Basic Usage

This guide covers the fundamental operations and concepts for using our product effectively.

## Core Concepts

Our product is designed around these key concepts:

- **Resources**: The primary objects you'll interact with
- **Operations**: Actions you can perform on resources
- **Workflows**: Sequences of operations to accomplish specific tasks

## Common Operations

### Creating a Resource

```python
from our_package import Client, Resource

client = Client(api_key="your_api_key")
new_resource = Resource(name="My Resource", type="example")
result = client.create_resource(new_resource)
print(f"Created resource with ID: {result.id}")
```

### Retrieving Resources

```python
# Get a specific resource by ID
resource = client.get_resource(id="resource-123")

# List all resources
resources = client.list_resources()
for resource in resources:
    print(f"Resource: {resource.name} (ID: {resource.id})")
    
# Filter resources
filtered = client.list_resources(type="example", limit=10)
```

### Updating Resources

```python
# Update a resource
resource = client.get_resource(id="resource-123")
resource.name = "Updated Name"
client.update_resource(resource)
```

### Deleting Resources

```python
# Delete a resource
client.delete_resource(id="resource-123")
```

## Error Handling

Always wrap your code in try-except blocks to handle potential errors:

```python
try:
    resource = client.get_resource(id="non-existent")
except ResourceNotFoundError:
    print("Resource does not exist")
except AuthenticationError:
    print("Authentication failed")
except ApiError as e:
    print(f"API error: {e}")
```

## Best Practices

- Always close connections when done
- Use pagination for large result sets
- Implement proper error handling
- Cache results when appropriate

For more advanced usage, see the [Advanced Features](advanced-features.md) guide.
