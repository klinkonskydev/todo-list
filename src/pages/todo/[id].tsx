import {
  TrashIcon,
  CheckIcon,
  Pencil1Icon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { ListComponent } from "../../components/List";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import Date from "../../components/Date";
import styles from "./list.module.css";
import todoHooks from "../../hooks/todo";
import Modal from "../../components/Modal";

export default function List() {
  const {
    list,
    firstLetterTransformUppercase,
    handleChangeATask,
    handleRemoveTask,
    removeLateralSpaces,
    newTodoModalIsOpen,
    closeModal,
    openModal,
    id,
  } = todoHooks();

  return (
    <>
      <Date type={1} />
      <Modal
        type="edit"
        isOpen={newTodoModalIsOpen}
        closeModal={closeModal}
        pageId={id}
      />

      <Layout>
        {list.map((ListProps) => (
          <ul key={ListProps.id}>
            <Head>
              <title>{ListProps.name}</title>
            </Head>

            <ListComponent>
              <Link href={`/`}>
                <a>
                  {ListProps.name} <br />
                  <span>{ListProps.items.length} items</span>
                </a>
              </Link>

              <div className={styles.Actions}>
                <button
                  className={styles.Button}
                  aria-label="deletar lista de tarefas"
                  title="deletar lista de tarefas"
                >
                  <TrashIcon onClick={() => handleRemoveTask(ListProps.id)} />
                </button>

                <button className={styles.Button} onClick={openModal}>
                  <PlusIcon />
                </button>
              </div>
            </ListComponent>

            <li className={styles.Header}>
              <h3>Nome</h3>
              <h3>Ações</h3>
            </li>

            {ListProps.items.map((itemList, itemIndex) => (
              <ListComponent key={itemIndex}>
                <h4 className={itemList.isChecked ? styles.TextIsChecked : ""}>
                  {removeLateralSpaces(
                    firstLetterTransformUppercase(itemList.name)
                  )}
                </h4>

                <div className={styles.Actions}>
                  <button
                    className={`${styles.Checkbox} ${
                      itemList.isChecked ? styles.IsChecked : ""
                    }`}
                    aria-label="Marcar tarefa como concluida"
                    title="Marcar tarefa como concluida"
                    onClick={() => handleChangeATask("", itemIndex)}
                  >
                    {itemList.isChecked ? <CheckIcon /> : ""}
                  </button>
                </div>
              </ListComponent>
            ))}
          </ul>
        ))}
      </Layout>
    </>
  );
}