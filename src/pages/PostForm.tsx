import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Chips } from 'primereact/chips';
import { Editor } from 'primereact/editor';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import DOMPurify from 'dompurify';
import { Tag, newTag } from '../interfaces';
import { useAuthStore, useBlogStore, useUIStore } from '../hooks';

import styles from './PostForm.module.css';

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  summary: z.string().optional(),
  tags: z.array(z.string()).min(1, "At least one tag is required").optional(),
  body: z.string().min(1, "Body is required"),
  featuredImage: z.string().optional()
});

type FormValues = z.infer<typeof schema>;

export function PostForm() {
  const { savePost, posts } = useBlogStore();
  const { user } = useAuthStore();
  const { pushMessage, setMessages, formAction } = useUIStore();

  const navigate = useNavigate();
  const { postId } = useParams();
  const post = posts.find(post => post.id === postId);

  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: post && formAction === 'edit' ? {
      title: post.title,
      summary: post.summary || '',
      featuredImage: post.featuredImage || '',
      tags: post.tags.map(tag => tag.value),
      body: post.body
    } : {}
  });

  const [tags, setTags] = useState<string[]>(getValues('tags') || []);

  useEffect(() => {
    setTags(getValues('tags') || []);
  }, [getValues('tags')]);

  const savePostData = (data: FormValues) => {
    const validatedTags: Tag[] = data.tags?.map(tag => newTag(tag)) || [];
    data.tags = validatedTags.map(tag => tag.value);
    data.body = DOMPurify.sanitize(data.body);

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
      navigate('/blog');
    } else if (formAction === 'edit' && post) {
      savePost({
        ...post,
        title: data.title,
        summary: data.summary,
        body: data.body,
        tags: validatedTags,
        featuredImage: data.featuredImage,
      }, formAction);
      navigate('..', { relative: 'path' });
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    try {
      savePostData(data);
    } catch (error) {
      if (error instanceof Error) pushMessage('error', error.message);
      return;
    }
  };

  useEffect(() => {
    const error: string[] = [];
    if(errors.title?.message) error.push(errors.title.message);
    if(errors.summary?.message) error.push(errors.summary.message);
    if(errors.body?.message) error.push(errors.body.message);
    if(errors.tags?.message) error.push(errors.tags.message);
    if(errors.featuredImage?.message) error.push(errors.featuredImage.message);
    setMessages({ error });
  }, [errors]);

  const pageTitle = () => {
    if(formAction === 'create') return "Edit New Post";
    else if(formAction === 'edit') return "Edit Post #" + postId;
  };

  return (
    <div className={styles.formContainer}>
      <Card
        className={styles.formInner}
        title={pageTitle()}
        pt={{
          body: { style: { width: '100%' } },
          title: { style: { textAlign: 'center' } },
          subTitle: { style: { textAlign: 'center' } },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
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
              name="tags"
              value={tags}
              onChange={(e) => {
                setTags(e.value || []);
                setValue("tags", e.value || []);
              }}
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
          <div>
            <label htmlFor="body">Body</label>
            <Editor
              name="body"
              value={getValues("body")}
              onTextChange={(e) => setValue("body", e.htmlValue || "")}
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
