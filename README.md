1. Install Node and Git:
```
sudo yum install -y git
sudo yum install -y --disablerepo=ol7_developer_EPEL nodejs
```

1. Run on the server with:

```
sudo PORT=80 npm run start:dev
```

Make sure you open up the firewall and add the ingress rule to the security list. 