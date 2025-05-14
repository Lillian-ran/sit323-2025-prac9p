# SIT323 9.1P – Integrating a Database into a Containerized Microservice Application

## Overview

This project demonstrates how to integrate a MongoDB database into an existing containerized microservice application deployed in a Kubernetes cluster. The microservice is a Node.js application that interacts with MongoDB to perform basic CRUD operations.

## Tools Used

- Git
- Visual Studio Code
- Node.js
- Docker
- Kubernetes
- Kubectl
- MongoDB
- Docker Compose

## Instructions

### 1. MongoDB Deployment in Kubernetes

- A MongoDB Replica Set is deployed using a StatefulSet and Headless Service.
- Persistent storage is configured using PersistentVolumes (PV) and PersistentVolumeClaims (PVC) to ensure data durability.

### 2. MongoDB User Creation

- A MongoDB root user is created using environment variables:
  - `MONGO_INITDB_ROOT_USERNAME`
  - `MONGO_INITDB_ROOT_PASSWORD`
- These credentials are stored securely using a Kubernetes Secret.

### 3. Persistent Storage Configuration

- PV and PVC configurations are included in the Kubernetes manifests to provide persistent storage for MongoDB data.

### 4. Kubernetes Secret Creation

- A Secret named `mongodb-secret` is created to store the MongoDB root password.
- This secret is referenced in the Node.js application's deployment manifest.

### 5. Application Deployment Modification

- The Node.js deployment is updated to include environment variables for MongoDB credentials.
- The app connects to MongoDB using a connection string that includes the replica set addresses, username, password, and authentication source.

### 6. Application Connection to MongoDB

- The Node.js app uses the official MongoDB Node.js driver to connect to the database.
- The app performs basic CRUD operations on a `demo` collection.

### 7. Testing the Deployment

- The deployed app is exposed using a Kubernetes NodePort Service.
- Basic API testing is performed to verify MongoDB integration:
  - `GET /` – returns all documents from the `demo` collection.

### 8. Backup and Disaster Recovery

- Persistent volumes ensure that MongoDB data persists across pod restarts.
- The setup supports future implementation of backup and recovery strategies.

### 9. Monitoring

- Application logs and MongoDB pod statuses are monitored using `kubectl logs` and `kubectl get pods`.
- Ensures database connectivity and service health.

## Submission Contents

This repository includes:

- `Dockerfile` for the Node.js microservice.
- Kubernetes manifests for:
  - MongoDB StatefulSet, Service, PV, PVC, and ConfigMap.
  - Node.js Deployment and Service.
  - MongoDB Secret.
- Node.js source code (`server.js`) with MongoDB connection logic.
- Detailed documentation in this `README.md` file explaining each step of the implementation.

## Accessing the Application

1. Ensure your Kubernetes cluster is running.
2. Apply all manifests using `kubectl apply -f`.
3. Access the Node.js app via `NodePort` at `http://<node-ip>:32000`.
4. Use `curl` or a browser to send a `GET` request to the root endpoint:
   ```bash
   curl http://localhost:32000/
