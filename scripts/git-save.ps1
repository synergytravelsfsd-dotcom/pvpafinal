Param(
  [string]$AuthorName = "PVPA Automation",
  [string]$AuthorEmail = "info@pvpa.com.pk",
  [string]$Message = "PVPA site updates: contact details, WhatsApp integration, membership CTA updates, Google Maps directions, navbar contact and branding, Membership categories corrections, Expo registration contact options; rollback QR features per request"
)

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Error "Git is not installed or not available in PATH. Install Git from https://git-scm.com/download/win and re-run this script."
  exit 1
}

if (-not (Test-Path ".git")) {
  git init
  git branch -M main
}

git config user.name $AuthorName
git config user.email $AuthorEmail

git add -A
git commit -m $Message

git log -n 1 --oneline
git status -s
