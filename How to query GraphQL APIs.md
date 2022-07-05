## showAllRecords

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