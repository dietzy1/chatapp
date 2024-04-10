package websocket

func remove(s []string, id string) []string {
	for i, v := range s {
		if v == id {
			return append(s[:i], s[i+1:]...)
		}
	}
	return s
}
