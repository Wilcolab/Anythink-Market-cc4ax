from src.config import config
from src.data_loader import load_documents
from src.embeddings import embed_documents
from src.retrieval import retrieve
from src.llm_client import generate_response

_documents: list[dict] | None = None
_embeddings = None


def initialize():
    """Initialize the RAG pipeline by loading and embedding documents."""
    global _documents, _embeddings
    _documents = load_documents()
    _documents, _embeddings = embed_documents(_documents)
    print(f"Initialized RAG pipeline with {len(_documents)} documents")


def build_context(retrieved_docs: list[dict]) -> str:
    """
    Build a context string from retrieved documents.
    
    TODO: Implement this function
    - Format each retrieved document into a readable string
    - Combine documents into a single context string
    - Keep within config.max_context_length if needed
    """
    # Format each document as: 'Title: ...\nContent: ...\n'
    doc_strings = []
    for doc in retrieved_docs:
        title = doc.get("title", "")
        content = doc.get("content", "")
        doc_str = f"Title: {title}\nContent: {content}\n"
        doc_strings.append(doc_str)
    context = "\n".join(doc_strings)
    # Truncate to max_context_length if needed
    if len(context) > config.max_context_length:
        context = context[:config.max_context_length]
    return context


def build_prompt(question: str, context: str) -> str:
    """
    Build the prompt to send to the LLM.
    
    TODO: Implement this function
    - Create a prompt that instructs the LLM to answer based on context
    - Include the context and question
    - Guide the LLM to be helpful and accurate
    """
    prompt = (
        "You are a helpful support assistant.\n"
        "Answer the user's question using only the information provided in the context below.\n"
        "If the answer is not in the context, say you don't know.\n\n"
        "Context:\n"
        f"{context}\n\n"
        "Question: " + question + "\n"
        "Answer:"
    )
    return prompt


def answer_question(question: str) -> str:
    """
    Main RAG function: retrieve relevant docs and generate an answer.
    
    TODO: Implement this function
    - Use retrieve() to get relevant documents
    - Use build_context() to format the documents
    - Use build_prompt() to create the full prompt
    - Use generate_response() to get the LLM's answer
    """
    global _documents, _embeddings
    
    if _documents is None or _embeddings is None:
        initialize()
    
    # Retrieve relevant documents
    retrieved_docs = retrieve(question, _documents, _embeddings)
    # Build context string
    context = build_context(retrieved_docs)
    # Build prompt for LLM
    prompt = build_prompt(question, context)
    # Generate response from LLM
    answer = generate_response(prompt, model=config.llm_model)
    return answer
