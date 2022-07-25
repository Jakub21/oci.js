from time import sleep
import subprocess as sp

shp = sp.Popen('powershell python -m shp.compile ./index.shp ./index.html --watch')
sass = sp.Popen('powershell sass --watch ./style.scss:./style.css')

while True:
  try: sleep(.5)
  except KeyboardInterrupt:
    print('Terminate')
    shp.terminate()
    sass.terminate()
    break
