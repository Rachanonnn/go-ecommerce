package test

import (
	"fmt"
	"go-ecommerce/domain/entities"
	sv "go-ecommerce/src/services"

	t "github.com/JohnFarmers/go-unit-tester"
)

func TestCaseGetAllUserStatusOK(sv sv.IUsersService) {
	fmt.Printf("TestCaseGetAllUserStatusOK : ")
	input := []interface{}{}
	expected := []interface{}{[]entities.UserDataFormat{}, nil}
	checkOutputTypeOnly := true

	t.UnitTest(sv.GetAllUser, expected, input, checkOutputTypeOnly)
}
