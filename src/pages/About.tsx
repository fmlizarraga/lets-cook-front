import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Skeleton } from 'primereact/skeleton';
import { useGitHubUser } from '../hooks';

import styles from './About.module.css';

export function About() {

  const { loading, user } = useGitHubUser('fmlizarraga');

  if(loading) {
    return (
      <article className={styles.aboutContainer}>
          <h2><Skeleton width='80px' height='1.5rem'></Skeleton></h2>
          <div className={styles.aboutInner}>
            <section>
                <h2><Skeleton width='100px' height='1.5rem'></Skeleton></h2>
                <div className={styles.aboutInnerSection}>
                  <div>
                    <Skeleton shape="circle" size="8rem"></Skeleton>
                    <div className={styles.profileSummary}>
                      <Skeleton height='1rem'></Skeleton>
                      <Skeleton height='1rem'></Skeleton>
                      <Skeleton height='1rem'></Skeleton>
                    </div>
                  </div>
                  <div>
                    <p>
                      <Skeleton height='15rem'></Skeleton>
                    </p>
                  </div>
                </div>
            </section>
            <section>
                <h2><Skeleton width='100px' height='1.5rem'></Skeleton></h2>
                <div className={styles.aboutInnerSection}>
                  <div className={styles.contactInfo}>
                    <Skeleton height='1rem'></Skeleton>
                    <Skeleton height='1rem'></Skeleton>
                    <div className={styles.contactLinks}>
                      <Skeleton shape="circle" size="1.5rem"></Skeleton>
                      <Skeleton shape="circle" size="1.5rem"></Skeleton>
                      <Skeleton shape="circle" size="1.5rem"></Skeleton>
                      <Skeleton shape="circle" size="1.5rem"></Skeleton>
                    </div>
                  </div>
                  <div className={styles.formContainer}>
                    <div>
                      <div className={styles.inputContainer}>
                        <Skeleton height='1rem' width='40%'></Skeleton>
                        <Skeleton height='45px'></Skeleton>
                      </div>
                      <div className={styles.inputContainer}>
                        <Skeleton height='1rem' width='40%'></Skeleton>
                        <Skeleton height='45px'></Skeleton>
                      </div>
                      <div className={styles.inputContainer}>
                        <Skeleton height='1rem' width='40%'></Skeleton>
                        <Skeleton height='45px'></Skeleton>
                      </div>
                      <div className={styles.inputContainer}>
                        <Skeleton height='1rem' width='40%'></Skeleton>
                        <Skeleton height='120px'></Skeleton>
                      </div>
                      <div className={styles.submitContainer}>
                        <Skeleton width='96px' height='45px'></Skeleton>
                      </div>
                    </div>
                  </div>
                </div>
            </section>
          </div>
      </article>
    );
  };

  if (!user) {
    return (
      <div>
        <h2>User not found</h2>
      </div>
    );
  };

  return (
    <article className={styles.aboutContainer}>
        <h2>About</h2>
        <div className={styles.aboutInner}>
          <section>
              <h2>About Me</h2>
              <div className={styles.aboutInnerSection}>
                <div>
                  <img className={styles.profilePic} src="/media/gh-avatar.png" alt="Franco Matias Lizárraga"/>
                  <div className={styles.profileSummary}>
                    <p className={styles.profileHeader}>{user.name}</p>
                    <p><i className='pi pi-map-marker'/>{user.location}</p>
                    <p>{user.hireable ? "Looking for work" : "Working as a developer"}</p>
                  </div>
                </div>
                <div>
                  <p>
                    {user.bio}
                  </p>
                </div>
              </div>
          </section>
          <section>
              <h2>Contact</h2>
              <div className={styles.aboutInnerSection}>
                <div className={styles.contactInfo}>
                  <p><i className='pi pi-envelope'/> {user.email || "Email hidden."}</p>
                  <p>
                    <span><i className='pi pi-phone'/> +549######</span>
                  </p>
                  <div className={styles.contactLinks}>
                    <a href="#"><i className='pi pi-linkedin'/></a>
                    <a href={user.html_url}><i className='pi pi-github'/></a>
                    <a href={"https://x.com/" + (user.twitter_username || "")}><i className='pi pi-twitter'/></a>
                    <a href={user.blog || "#"}><i className='pi pi-link'/></a>
                  </div>
                </div>
                <div className={styles.formContainer}>
                  <form>
                    <div className={styles.inputContainer}>
                      <label htmlFor="first-name">First Name<i className='pi pi-asterisk'/></label>
                      <InputText type="text" name="first-name" id="first-name" />
                    </div>
                    <div className={styles.inputContainer}>
                      <label htmlFor="last_name">Last Name<i className='pi pi-asterisk'/></label>
                      <InputText type="text" name="last_name" id="last_name" />
                    </div>
                    <div className={styles.inputContainer}>
                      <label htmlFor="email">Email<i className='pi pi-asterisk'/></label>
                      <InputText type="email" name="email" id="email" />
                    </div>
                    <div className={styles.inputContainer}>
                      <label htmlFor="comment">Comment</label>
                      <InputTextarea rows={5} name="comment" id="comment"/>
                    </div>
                    <div className={styles.submitContainer}>
                      <Button label='Submit' outlined />
                    </div>
                  </form>
                </div>
              </div>
          </section>
        </div>
    </article>
  );

};
