package websocket

import (
	"reflect"
	"testing"
)

func TestRemove(t *testing.T) {
	// Test case 1: Removing an existing string
	input1 := []string{"apple", "banana", "cherry"}
	expected1 := []string{"apple", "cherry"}
	output1 := remove(input1, "banana")
	if !reflect.DeepEqual(output1, expected1) {
		t.Errorf("Test case 1 failed. Expected %v, got %v", expected1, output1)
	}

	// Test case 2: Removing a non-existing string
	input2 := []string{"apple", "banana", "cherry"}
	expected2 := []string{"apple", "banana", "cherry"}
	output2 := remove(input2, "orange")
	if !reflect.DeepEqual(output2, expected2) {
		t.Errorf("Test case 2 failed. Expected %v, got %v", expected2, output2)
	}

	// Test case 3: Removing from an empty slice
	input3 := []string{}
	expected3 := []string{}
	output3 := remove(input3, "apple")
	if !reflect.DeepEqual(output3, expected3) {
		t.Errorf("Test case 3 failed. Expected %v, got %v", expected3, output3)
	}
}
