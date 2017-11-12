package main

import (
	"flag"
	"fmt"
	"github.com/howeyc/gopass"
	"github.com/writeas/go-writeas"
	"io/ioutil"
	"os"
)

func main() {
	// Get parameters
	u := flag.String("u", "", "Write.as username")
	font := flag.String("font", "norm", "The font for the post (norm, sans, wrap, mono, code)")
	flag.Parse()

	// Validate parameters
	args := flag.Args()
	if *u == "" || len(args) == 0 {
		fmt.Fprintf(os.Stderr, "usage: writeas-import -u username file1 [file2|file3...]\n")
		os.Exit(1)
	}

	// Get password
	fmt.Print("Password: ")
	pass, err := gopass.GetPasswdMasked()
	if err != nil {
		fmt.Fprintf(os.Stderr, "error reading pass: %v\n", err)
		os.Exit(1)
	}
	// Validate password
	if len(pass) == 0 {
		fmt.Fprintf(os.Stderr, "Please enter your password.\n")
		os.Exit(1)
	}

	// Create Write.as client
	c := writeas.NewClient()

	// Log user in
	fmt.Print("Logging in...")
	au, err := c.LogIn(*u, string(pass))
	if err != nil {
		fmt.Fprintf(os.Stderr, "error: %v\n", err)
		os.Exit(1)
	}
	fmt.Print("OK\n")
	c.SetToken(au.AccessToken)

	// Upload files
	for _, fn := range args {
		// Read file contents
		fmt.Print("Reading file...")
		content, err := ioutil.ReadFile(fn)
		if err != nil {
			fmt.Fprintf(os.Stderr, "error %s: %v\n", fn, err)
			continue
		}
		fmt.Print("OK\n")

		// Publish post
		fmt.Print("Publishing...")
		p, err := c.CreatePost(&writeas.PostParams{
			Title:   "",
			Content: string(content),
			Font:    *font,
		})
		if err != nil {
			fmt.Fprintf(os.Stderr, "error publishing %s: %v\n", fn, err)
			continue
		}
		fmt.Printf("Created post %s from %s\n", p.ID, fn)
	}
}
