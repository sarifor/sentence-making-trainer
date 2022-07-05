```graphQL
{
  showAllRecords {
    records {
      index
      sentence
      translated
      source
      uploaded   
    }
  }
}
```

```graphQL
mutation {
  uploadRecord(record: {
    sentence: "Finally done"
    source: "me"
  }) {
    ok
  }
}
```

```graphQL
mutation {
  editRecord(
    editedRecord: {
      index: 21
      translated: "from graphql"
    }
  ) {
    ok
  }
}
```

```graphQL
mutation {
  deleteRecord(
    index: 21
  ) {
    ok
  }
}
```