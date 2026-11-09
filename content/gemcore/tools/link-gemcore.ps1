# Point this project's media\ at a GemCore checkout (a directory junction: no admin rights needed).
# Usage: tools\link-gemcore.ps1 [-GemCore PATH]   (default: GemCore cloned beside the raea checkout)
param([string]$GemCore = (Join-Path $PSScriptRoot "..\..\..\..\GemCore"))
$here = Resolve-Path (Join-Path $PSScriptRoot "..")
if (-not (Test-Path (Join-Path $GemCore "RookTKOs GemCore.yyp"))) { throw "no GemCore project at $GemCore (pass -GemCore PATH)" }
$gem = Resolve-Path $GemCore
$link = Join-Path $here "media"
if (Test-Path $link) { (Get-Item $link).Delete() }
New-Item -ItemType Junction -Path $link -Target $gem | Out-Null
"media -> $gem"
