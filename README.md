# No Deply Friday

[![PR validation](https://github.com/niranjanshk27/no-deploy-friday/actions/workflows/check-pr.yml/badge.svg)](https://github.com/niranjanshk27/no-deploy-friday/actions/workflows/check-pr.yml)

Github action that tell you "It's Friday, Do not deploy on production". It stop github action if its a Friday in a given timezone.

## Usage

```yaml
- name: No Deploy Firday
  uses: niranjanshk27/no-deply-friday@main
  with:
    timezone: Asia/Kathmandu

```
