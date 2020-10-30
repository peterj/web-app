Install Node and Git:
```
sudo yum install -y git
sudo yum install -y oracle-nodejs-release-el7 oracle-release-el7
sudo yum install -y --disablerepo=ol7_developer_EPEL nodejs
sudo systemctl stop firewalld
sudo systemctl disable firewalld
```

Clone the repo and run on the server with:

```
git clone https://github.com/peterj/web-app
cd web-app
export LB_COOKIE_NAME=oci-lb-cookie
sudo npm install nodemon -D
sudo PORT=80 npm run start:dev
```

Make sure you open up the firewall and add the ingress rule to the security list. 

## Environment variables

| Name | Default value |
| --- | --- |
|PORT | 8080 |
| LB_COOKIE_NAME | oci-lb-cookie |