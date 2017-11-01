package main

import (
	"fmt"
	"./bancomat"
)

func main() {
	bancomat.InitValue()
	printResult(bancomat.Exchange(100, []int{25,50}))
	printResult(bancomat.Exchange(100, []int{50}))
	printResult(bancomat.Exchange(25, []int{1,2,10}))
	printResult(bancomat.Exchange(50, []int{25}))
}

func printResult(r []interface{}) {
	fmt.Println(r[0], ":", r[1])
}
