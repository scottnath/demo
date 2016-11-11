#!/bin/bash
if [ -x "sigsci/bin/sigsci-start" ]
then
  sigsci/bin/sigsci-start npm start
else
  npm start
fi
