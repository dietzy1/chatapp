package clients

import (
	"bytes"
	"context"
	"fmt"
	"io"

	"github.com/dietzy1/chatapp/service"
	"github.com/imagekit-developer/imagekit-go"
	"github.com/imagekit-developer/imagekit-go/api/media"
	"github.com/imagekit-developer/imagekit-go/api/uploader"
)

type cdn struct {
	client *imagekit.ImageKit
}

type Config struct {
	PublicKey   string
	PrivateKey  string
	UrlEndpoint string
}

func NewCdnClient(config Config) *cdn {
	client := imagekit.NewFromParams(imagekit.NewParams{
		PrivateKey:  config.PrivateKey,
		PublicKey:   config.PublicKey,
		UrlEndpoint: config.UrlEndpoint,
	})

	return &cdn{client: client}
}

// sends a POST http request that stores the image bytes with a path of uuid.jpg at the CDN.
func (c *cdn) UploadIcon(ctx context.Context, icon service.Icon, buf bytes.Buffer, folder string) (string, error) {
	params := uploader.UploadParam{
		FileName:          icon.IconId.String() + ".png",
		UseUniqueFileName: newFalse(),
		Folder:            folder,
		IsPrivateFile:     newFalse(),
		ResponseFields:    "filepath",
	}
	res, err := c.client.Uploader.Upload(ctx, io.ByteReader(&buf), params)
	if err != nil {
		return "", err
	}
	return res.Data.Url, nil
}

// Sends a DELETE http request that deletes the image bytes at the CDN.
func (c *cdn) DeleteIcon(ctx context.Context, uuid string) error {
	fileid, err := c.GetIcon(ctx, uuid)
	if err != nil {
		return err
	}
	_, err = c.client.Media.DeleteFile(ctx, fileid)
	if err != nil {
		return err
	}
	return nil
}

// helper function to enable deletefile and update file. Sends a GET request that locates the image bytes at the CDN.
func (c *cdn) GetIcon(ctx context.Context, uuid string) (string, error) {
	query := fmt.Sprintf(`name = "%s"`, uuid+".png")
	res, err := c.client.Media.Files(ctx, media.FilesParam{
		SearchQuery: query,
	})
	if err != nil {
		return "", err
	}
	return res.Data[0].FileId, nil
}

// Hack to circumvent poor client library implementation.
func newFalse() *bool {
	b := false
	return &b
}
