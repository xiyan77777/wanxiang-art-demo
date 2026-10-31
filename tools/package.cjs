// Offline ZIP with an explicit allowlist. Uses Python's standard library only.
const {spawnSync}=require('node:child_process');
const path=require('node:path');
const python=process.env.WANXIANG_PYTHON || (process.platform==='win32'?'python':'python3');
const result=spawnSync(python,['-c',[
 'from pathlib import Path',
 'from zipfile import ZipFile, ZIP_DEFLATED',
 'root=Path.cwd()',
 "target=root/'dist'/'wanxiang-art-demo-v0.5-art.1-offline.zip'",
 'target.parent.mkdir(exist_ok=True)',
 "files=['index.html','启动离线试玩.bat','启动.md','改进说明.md']",
 'with ZipFile(target, "w", ZIP_DEFLATED) as archive:',
 '    for name in files: archive.write(root/name,name)',
 'with ZipFile(target) as archive:',
 '    assert archive.testzip() is None',
 '    assert archive.namelist()==files',
 '    assert archive.read("index.html")== (root/"index.html").read_bytes()',
 'print(target.name)',
].join('\n')],{cwd:path.resolve(__dirname,'..'),stdio:'inherit'});
if(result.error) console.error('Python 3 required; set WANXIANG_PYTHON if needed.');
process.exit(result.status ?? 1);
