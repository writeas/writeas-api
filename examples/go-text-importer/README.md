Text file importer (Go)
=======================

A simple command-line utility for importing Markdown (or plain text) files into Write.as, writing in Go / golang.

## Getting Started

If you already have Go installed, install the utility with:

```bash
go get github.com/writeas/writeas-api/examples/go-text-importer/cmd/writeas-import
```

Now run the utility by supplying your Write.as username, optional blog alias, and the files you want to import to that account:

```bash
# import these files as anonymous posts
writeas-import -u matt yesterday.md thismorning.md apoem.md

# import all .txt files in this directory as anonymous posts
writeas-import -u matt *.txt

# import all .txt files in this dir to matts-alter-ego blog
writeas-import -u matt -c matts-alter-ego *.txt
```
