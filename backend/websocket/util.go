package websocket

func remove(s []string, id string) []string {
	for i, v := range s {
		if v == id {
			s = append(s[:i], s[i+1:]...)
			break // Exit loop once element is removed
		}
	}
	return s
}
