# SENG402

# Maintaining
This repo and the backend are hosted on the vm. The password is HolmesCovering6833 Access the VM using ssh using the command
ssh gca73@csse-risk1

The backend is hosted with PM2, if you press the "Start" button and nothing happens then the backend has crashed. Every few weeks PM2 crashes so youll probably need to restart it every time you play if you play it occasionally. Do these commands to restart the backend
```
pm2 delete all
cd /home/gca73/402-backend/backend
pm2 start npm --name "backend" -- run dev
```


The frontend is hosted on NGINX and if you see an error and cannot see the web app you need to rebuild the project and restart nginx (You might have to renew the certbot keys if it is to do with HTTPS). Do with the following commands to restart
```
cd /home/gca73/seng402
npm install
npm run build
sudo systemctl restart nginx
```

Full reset
To full reset do the commands (make sure to ssh into the VM first)
```
pm2 delete all
cd /home/gca73/402-backend/backend
pm2 start npm --name "backend" -- run dev
cd /home/gca73/seng402
npm install
npm run build
sudo systemctl restart nginx
```

## Copy the player list
To copy the player list from the VM, first log into the VM then paste this command.
```
cat 402-backend/backend/players.txt
```


