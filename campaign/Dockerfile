FROM openjdk:21-jdk
ENV PORT=8080
COPY build/libs/campaign-backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]