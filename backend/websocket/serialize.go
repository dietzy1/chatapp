package websocket

//"github.com/golang/protobuf/proto"

/* func marshal(message *messagev1.CreateMessageResponse) ([]byte, error) {

	msg, err := proto.Marshal(message)
	if err != nil {
		zap.S().Errorf("Error marshalling message: %v", err)
		return nil, err
	}
	return msg, nil
}

func unmarshal(msg []byte) (*messagev1.CreateMessageRequest, error) {

	message := &messagev1.CreateMessageRequest{}

	err := proto.Unmarshal(msg, message)
	if err != nil {
		zap.S().Errorf("Error unmarshalling message: %v", err)
		return nil, err
	}
	log.Println(message)
	return message, nil
}

func marshalActivity(activity *chatroomv1.Activity) ([]byte, error) {

	msg, err := proto.Marshal(activity)
	if err != nil {

		zap.S().Errorf("Error marshalling activity: %v", err)
		return nil, err
	}
	return msg, nil

}

func unmarshalActivity(msg []byte) (*chatroomv1.Activity, error) {

	activity := &chatroomv1.Activity{}

	err := proto.Unmarshal(msg, activity)
	if err != nil {
		zap.S().Errorf("Error unmarshalling activity: %v", err)
		return nil, err
	}
	return activity, nil
}
*/
