#!/bin/bash

echo "Pulling from git repository"
sudo git pull

echo "Building application"
sudo docker compose up -d --build