package bancomat

import (
	"math/rand"
	"../semaphore"
	"sync"
)

var initStorage []int
var box = Bancomat{}
var g = &sync.WaitGroup{}

func InitValue() {
	initStorage = []int{1,2,2,10,10,25,25,50,50,50,100}
	box.semResult = semaphore.New(1)
	box.nominal = map[string]int{
		"1" 	: 1,
		"2" 	: 2,
		"5" 	: 5,
		"10" 	: 10,
		"25" 	: 25,
		"50" 	: 50,
		"100" 	: 100,
	}
}


type Bancomat struct {
	result []interface{}
	nominal map[string]int
	semResult *semaphore.Semaphore
}

func Exchange(value int, returnNominal []int) []interface{} {
	nominal := identifierNominal(value)
	g.Add(1)
	go exchangeProcess(nominal, returnNominal)
	g.Wait()
	result := result()
	return result
}

func exchangeProcess(value int, returnNominal []int) {
	counter := 0
	isContinue := false

	for _, v := range initStorage {
		if contains(returnNominal, v) {
			if (counter + v) > value {
				continue
			}
			counter += v
			if counter == value {
				isContinue = true
				break
			}
		}
	}


	if isContinue {
		var s []int
		m := initStorage
		deleted := 0
		counter := 0
		for i := range m {
			j := i - deleted
			if contains(returnNominal, m[j]) {
				s = append(s, m[j])
				counter += m[j]
				m = m[:j+copy(m[j:], m[j+1:])]
				deleted++
				if counter == value {
					isContinue = true
					break
				}
			}
		}
		setResult([]interface{}{
			"Success",
			s,
		})
	} else {
		setResult([]interface{}{
			"Error",
			[]int{},
		})
	}

	g.Done()
}

func contains(s []int, e int) bool {
	for _, a := range s {
		if a == e {
			return true
		}
	}
	return false
}


func result() []interface{} {
	box.semResult.Acquire()
	defer box.semResult.Release()
	return box.result
}

func setResult(r []interface{}) {
	box.semResult.Acquire()
	box.result = r
	box.semResult.Release()
}


func identifierNominal(v int) int {
	for i := 0; i < 100000; i++ {
		r := randIntMapKey(box.nominal)
		if r == v {
			return v
		}
	}
	panic("Don't identifier nominal")
}

func randIntMapKey(m map[string]int) int {
	i := rand.Intn(len(m))
	for _, v := range m {
		if i == 0 {
			return v
		}
		i--
	}
	panic("Error in rand map key")
}