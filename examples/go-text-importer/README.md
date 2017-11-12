Text file importer (Go)
=======================

A simple command-line utility for importing Markdown (or plain text) files into Write.as, writing in Go / golang.

## Getting Started

If you already have Go installed, install the utility with:

```bash
go get github.com/writeas/writeas-api/examples/go-text-importer/cmd/writeas-import
```

Now run the utility by supplying your Write.as credentials and the files you want to import to that account:

```bash
writeas-import -u matt -p password yesterday.md thismorning.md apoem.md
writeas-import -u matt -p password *.txt
```
