package utils

import (
	"bytes"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"go-ecommerce/domain/entities"
	"os"
	"strings"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

func UploadS3FromString(fileName []byte, keyName string, contentType string) (string, error) {
	sess, err := session.NewSession(&aws.Config{
		Region:      aws.String(os.Getenv("AWS_REGION")),
		Credentials: credentials.NewStaticCredentials(os.Getenv("AWS_ACCESS_KEY_ID"), os.Getenv("AWS_SECRET_ACCESS_KEY"), ""),
	})
	if err != nil {
		return "", err
	}

	svc := s3.New(sess)

	_, err = svc.PutObject(&s3.PutObjectInput{
		Body:        bytes.NewReader(fileName),
		Bucket:      aws.String(os.Getenv("AWS_BUCKET")),
		Key:         aws.String(keyName),
		ContentType: aws.String(contentType),
		Metadata:    map[string]*string{"Content-Disposition": aws.String("attachment")},
	})
	if err != nil {
		return "", err
	}

	req, _ := svc.GetObjectRequest(&s3.GetObjectInput{
		Bucket: aws.String(os.Getenv("AWS_BUCKET")),
		Key:    aws.String(keyName),
	})

	_, err = req.Presign(100 * 365 * 24 * time.Hour) // 100 years expiration
	if err != nil {
		return "", err
	}

	fullURL := fmt.Sprintf("https://%s.s3.%s.amazonaws.com/%s", os.Getenv("AWS_BUCKET"), os.Getenv("AWS_REGION"), keyName)

	return fullURL, nil
}

func HashString(userID string) (string, error) {
	byteID := []byte(userID)
	hash := sha256.New()
	hash.Write(byteID)
	hashed := hash.Sum(nil)
	hexDigest := hex.EncodeToString(hashed)
	return hexDigest, nil
}

func CreateKeyNameImage(data *entities.UserDataFormat, imageType string, fileName string) (string, string) {

	email := strings.ToLower(data.Email)
	name := strings.ToLower(data.Firstname)

	keyName := fmt.Sprintf("picture/%v/%v.%v", email, name, imageType)
	if fileName != "" {
		keyName = fmt.Sprintf("picture/%v/%v.%v", email, name, imageType)
	}
	contentType := fmt.Sprintf("image/%v", imageType)
	return keyName, contentType
}

func CreateKeyNameProductImage(data *entities.ProductDataFormat, imageType string, fileName string) (string, string) {

	productID := strings.ToLower(data.ProductID)
	productName := strings.ToLower(data.Name)

	keyName := fmt.Sprintf("picture/%v/%v.%v", productID, productName, imageType)
	if fileName != "" {
		keyName = fmt.Sprintf("picture/%v/%v.%v", productID, productName, imageType)
	}
	contentType := fmt.Sprintf("image/%v", imageType)
	return keyName, contentType
}
