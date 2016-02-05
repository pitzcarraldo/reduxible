#!/bin/bash -e

if ! [ -e bin/release.sh ]; then
  echo >&2 "Please run scripts/release.sh from the repo root"
  exit 1
fi

validate_semver() {
  if ! [[ $1 =~ ^[0-9]\.[0-9]+\.[0-9](-.+)? ]]; then
    echo >&2 "Version $1 is not valid! It must be a valid semver string like 1.0.2 or 2.3.0-beta.1"
    exit 1
  fi
}

current_version=$(node -p "require('./package').version")

printf "Current version  is $current_version. \n"

validate_semver $current_version

tag_name="v$current_version"

git tag $tag_name -f
git tag latest -f

git push origin $tag_name -f
git push origin latest -f

npm publish