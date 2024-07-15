import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Editor } from 'primereact/editor';
import { Chips } from 'primereact/chips';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'primereact/button';
import { useState, useEffect } from 'react';
import { useAuthStore, useBlogStore, useUIStore } from '../hooks';
import { Tag, newTag } from '../interfaces';

import styles from './PostForm.module.css';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  summary: z.string().optional(),
  tags: z.array(z.string()).min(1, "At least one tag is required").optional(),
  body: z.string().min(1, "Body is required"),
  featuredImage: z.string().optional()
});

type FormValues = z.infer<typeof schema>;

export function PostForm() {
  const { savePost } = useBlogStore();
  const { user } = useAuthStore()
  const { pushMessage, setMessages, formAction } = useUIStore();

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormValues>({
    resolver: zodResolver(schema)
  });

  const [tags, setTags] = useState<string[]>([]);
  const [body, setBody] = useState<string>("");

  useEffect(() => {
    setValue("body", body);
  }, [body, setValue]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    try {
      const validatedTags: Tag[] = tags.map(tag => newTag(tag));
      data.tags = validatedTags.map(tag => tag.value);
      if (formAction === 'create') {
        savePost({
          author: user,
          title: data.title,
          summary: data.summary,
          body: data.body,
          tags: validatedTags,
          featuredImage: data.featuredImage,
          likes: 0,
          status: 'Pending',
          timeStamp: Date.now()
        }, formAction);
      } else if (formAction === 'edit') {
        // TODO edition logic...
      }
      navigate('/blog');
    } catch (error) {
      if (error instanceof Error) pushMessage('error', error.message);
      return;
    }
  };

  return (
    <div className={styles.formContainer}>
      <Card
        className={styles.formInner}
        title="Post Editor"
        pt={{
          body: { style: { width: '100%' } },
          title: { style: { textAlign: 'center' } },
          subTitle: { style: { textAlign: 'center' } },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.errorContainer}>
            {Object.keys(errors).length > 0 && (
              <div className={styles.errorList}>
                {errors.title && <p>title {errors.title.message}</p>}
                {errors.summary && <p>summary {errors.summary.message}</p>}
                {errors.body && <p>body {errors.body.message}</p>}
                {errors.tags && <p>tags {errors.tags.message}</p>}
                {errors.featuredImage && <p>image {errors.featuredImage.message}</p>}
              </div>
            )}
          </div>
          <div className={styles.formSection}>
            <label htmlFor="title">Title</label>
            <InputText {...register("title")} placeholder='Write a title...' />
          </div>
          <div className={styles.formSection}>
            <label htmlFor="summary">Summary (optional)</label>
            <InputTextarea {...register("summary")} placeholder='Write a short summary...' />
          </div>
          <div className={styles.formSection}>
            <label htmlFor="tags">Tags (at least one)</label>
            <Chips
              value={tags}
              onChange={(e) => setTags(e.value ?? [])}
              placeholder='Add each tag by pressing Enter'
              pt={{
                root: { style: { width: '100%' } },
                container: { style: { width: '100%' } },
                input: { style: { width: '100%' } },
              }}
            />
          </div>
          <div className={styles.formSection}>
            <label htmlFor="featuredImage">Featured picture (optional)</label>
            <InputText {...register("featuredImage")} placeholder='Insert a valid URL...' />
          </div>
          <div >
            <label htmlFor="body">Body</label>
            <Editor
              value={body}
              onTextChange={(e) => setBody(e.htmlValue || "")}
              style={{ height: '240px' }}
              placeholder='Write the body of your post here...'
            />
          </div>
          <div className={styles.formSection}>
            <Button label="Post" type="submit" />
          </div>
        </form>
      </Card>
    </div>
  );
};
