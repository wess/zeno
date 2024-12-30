#!/bin/bash

set -e

REPO="your-username/zeno" # Replace with your GitHub repository
INSTALL_DIR="/usr/local/bin" # Directory where Zeno will be installed

echo "Installing Zeno..."

# Determine the platform
OS="$(uname -s)"
ARCH="$(uname -m)"

if [[ "$OS" != "Linux" && "$OS" != "Darwin" ]]; then
  echo "Unsupported OS: $OS"
  exit 1
fi

# Determine the appropriate binary
case "$ARCH" in
"x86_64")
  ARCH="amd64"
  ;;
"arm64" | "aarch64")
  ARCH="arm64"
  ;;
*)
  echo "Unsupported architecture: $ARCH"
  exit 1
  ;;
esac

# Fetch the latest release
LATEST_RELEASE=$(curl -fsSL "https://api.github.com/repos/$REPO/releases/latest" | grep "tag_name" | sed -E 's/.*"([^"]+)".*/\1/')
if [[ -z "$LATEST_RELEASE" ]]; then
  echo "Failed to fetch the latest release."
  exit 1
fi

echo "Latest release: $LATEST_RELEASE"

# Construct the download URL
BINARY_NAME="zeno-${OS,,}-${ARCH}"
DOWNLOAD_URL="https://github.com/$REPO/releases/download/$LATEST_RELEASE/$BINARY_NAME"

echo "Downloading Zeno binary from $DOWNLOAD_URL..."

# Download the binary
TEMP_FILE=$(mktemp)
curl -fsSL "$DOWNLOAD_URL" -o "$TEMP_FILE"

# Make the binary executable
chmod +x "$TEMP_FILE"

# Move the binary to the install directory
sudo mv "$TEMP_FILE" "$INSTALL_DIR/zeno"

echo "Zeno has been installed successfully!"
echo "Run 'zeno' to get started."
