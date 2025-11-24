import { Copyright } from "lucide-react"
import * as React from "react"

export function Footer() {
  return (
    <footer className="ml-12 flex border-t px-4 py-2 justify-center lg:justify-start">
      <div className="flex gap-2 items-center">
        <Copyright />
        <span>Powered By</span>
        <a href="https://keross.com" target="_blank">
          Keross
        </a>
        <span className="">|</span>
        <span id="txtCopyrightYear" className="">
          {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}

