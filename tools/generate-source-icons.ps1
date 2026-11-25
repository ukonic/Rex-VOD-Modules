$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$repo = Split-Path -Parent $PSScriptRoot
$size = 128
# Published favicons or logos linked from each site's own pages.
# Missing, generic template and unrelated third-party logos are omitted.
$siteIcons = [ordered]@{
    aidan      = 'https://lovedan.net/favicon.ico'
    baofeng    = 'https://bfzy.tv/favicon.ico?v=vozy-20261114-layout1'
    changzhang = 'https://changzhang.tv/apple-touch-icon.png?v=cz-film-20261017'
    dadi       = 'https://dadiapi.com/upload/logo.jpg'
    diyi       = 'https://www.diyizy.com/template/tyys/images/logo.png'
    dytt       = 'https://caiji.dyttzyapi.com/favicon.ico'
    fanqie     = 'https://fqzy.me/upload/site/20260313-1/b4067d25ae81f84259ddf19002d0cb1a.jpg'
    guangsu    = 'https://guangsuzy.com/template/guangsu/image/logo.png'
    haohua     = 'https://www.haohuazy.com/favicon.ico'
    hongniu    = 'https://hongniuzy.com/template/vipzy/images/logo.png'
    huya       = 'https://www.huyaapi.com/favicon.ico'
    ikun       = 'https://ikunzyapi.com/favicon.ico'
    jinying    = 'https://jyzyapi.com/favicon.ico'
    jisu       = 'https://jszyapi.com/favicon.ico'
    kuaiche    = 'https://www.kuaichezy.com/template/shenlanse/static/picture/logo.png'
    maoyan     = 'https://www.maoyanzy.cc/favicon.ico'
    niuniu     = 'https://niuniuzy.me/images/favicon.png'
    ok         = 'https://okzyw.net/template/okzy/static/images/ok-logo.png'
    piaoling   = 'https://p2100.net/template/10010dy/images/favicon.ico'
    ruyi       = 'https://www.ryzyw.com/template/default/img/favicon.png'
    shandian   = 'https://www.shandianzy.cc/template/shandianzy/images/logo.png'
    subo       = 'https://www.subozy.com/upload/site/20230220-1/e632a403d903b831199109f99189f480.png'
    suoni      = 'https://suonizy.com/static/suoni/img/logo.png'
    wujin      = 'https://wujinzy.com/template/ziyuan2/images/logo.jpg'
    xingye     = 'https://xyezy.com/template/default/img/log.jpg'
    xinlang    = 'https://xinlangzy.com/template/xinlangzy/image/logo.png'
    yinghua    = 'https://yhzy.cc/template/ziyuan2/images/logo.png'
    youku      = 'https://ukuzy.com/template/vipzy/images/logo.gif'
    zuida      = 'https://zuida.xyz/template/ziyuan2/images/logo.png'
    zy360      = 'https://360zy.com/favicon.ico'
}

function Read-SiteIcon([uri]$url) {
    $response = Invoke-WebRequest -UseBasicParsing -Uri $url -TimeoutSec 7
    [byte[]]$bytes = $response.Content
    if ($bytes.Length -gt 524288) { throw 'Icon is larger than 512 KiB' }
    $stream = [System.IO.MemoryStream]::new($bytes, $false)
    try {
        if ($bytes.Length -ge 6 -and $bytes[0] -eq 0 -and $bytes[1] -eq 0 -and $bytes[2] -eq 1 -and $bytes[3] -eq 0) {
            $icon = [System.Drawing.Icon]::new($stream, 128, 128)
            try { return $icon.ToBitmap() } finally { $icon.Dispose() }
        }
        $image = [System.Drawing.Image]::FromStream($stream)
        try { return [System.Drawing.Bitmap]::new($image) } finally { $image.Dispose() }
    } finally {
        $stream.Dispose()
    }
}

foreach ($entry in $siteIcons.GetEnumerator()) {
    $file = Join-Path (Join-Path (Join-Path $repo 'sources') $entry.Key) 'icon.png'
    if (Test-Path -LiteralPath $file) { continue }
    try { $siteIcon = Read-SiteIcon $entry.Value } catch {
        Write-Warning "$($entry.Key): source icon could not be used ($($_.Exception.Message))"
        continue
    }
    $bitmap = [System.Drawing.Bitmap]::new($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    try {
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $scale = $size / [Math]::Max($siteIcon.Width, $siteIcon.Height)
        $width = [Math]::Max(1, [int]($siteIcon.Width * $scale))
        $height = [Math]::Max(1, [int]($siteIcon.Height * $scale))
        $rect = [System.Drawing.Rectangle]::new([int](($size - $width) / 2), [int](($size - $height) / 2), $width, $height)
        $graphics.DrawImage($siteIcon, $rect)
        $bitmap.Save($file, [System.Drawing.Imaging.ImageFormat]::Png)
        Write-Output $entry.Key
    } finally {
        $siteIcon.Dispose()
        $graphics.Dispose()
        $bitmap.Dispose()
    }
}
