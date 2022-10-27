import os
import zipfile


path = os.path.dirname(__file__)
try:
    file_to_remove = os.path.join(path, "widget.zip")
    os.remove(file_to_remove)
except Exception:
    print(Exception)

files = os.walk(path)
    
# file_to_add = os.path.join(path, 'xren.txt')
archive = "widget.zip"

with zipfile.ZipFile(archive, 'w') as zf:
    for folder, subfolders, files in os.walk(path):
        for file in files:
            if file.endswith('.py') or file.endswith('.zip'):
                continue
            # print(file)
            zf.write(os.path.join(folder, file), os.path.relpath(os.path.join(folder,file)), compress_type = zipfile.ZIP_DEFLATED)
    
    