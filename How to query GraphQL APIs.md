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
  postUploadRecord(record: {
    sentence: "Finally done"
    source: "me"
  }) {
    ok
  }
}
```

```graphQL
mutation {
  postEditRecord(
    editedRecord: {
      index: 21
      translated: "from graphql"
    }
  ) {
    ok
  }
}
```