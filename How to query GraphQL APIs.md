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
{
  getRecord(index: 35) {
    record {
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